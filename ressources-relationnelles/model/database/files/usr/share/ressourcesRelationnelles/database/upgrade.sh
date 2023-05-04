#!/bin/bash
DIR=$(readlink -m $(dirname ${0}))
source ${DIR}/lib_functions.sh;
SUBDIR=ressourcesRellationnelles
DATABASE_NAME=${1:-${SUBDIR}}
path=${DIR}
pgd_version=$(pg_dump --version | awk '{print $3}')
case $pgd_version in
	13\.[0-9])
		ref_schema_path=ref_schema/pg-13
	;;
	*)
		echo "ERROR: pg_dump unsupported Version (${pgd_version})" >&2;
		exit 1;
	;;
esac;

re_grant_database_access(){
	echo -n "Re-Grant database access...";
	catch stdout stderr sudo -u postgres -- psql ${DATABASE_NAME} -X --pset pager=off -v ON_ERROR_STOP=1 -v database_name=${DATABASE_NAME} -q -1 -f ${path}/grant_connect.psql
	if [ $? != 0 ]; then
		echo "FAIL";
		echo "${stdout}";
		echo "${stderr}" >&2;
		echo "ERROR: Something failed in revoke and kick" >&2;
		exit 1;
	fi;
	echo "DONE"
}

echo -n "Getting DB versions...";
catch stdout stderr sudo -u postgres -- psql ${DATABASE_NAME} -X --pset pager=off -v ON_ERROR_STOP=1 -q -1 -t -c "SELECT format('%s_%s_%04s', A.major, A.minor, to_char(A.point, 'fm0000')) AS version FROM (SELECT * FROM schemachangelog ORDER BY id DESC LIMIT 1) AS A;";
starting_version=${stdout/ /}
if ! echo "${starting_version}" | grep -q '[0-9]\{1,4\}_[0-9]\{1,4\}_[0-9]\{4\}'; then
	echo "FAIL";
	echo "${stdout}";
	echo "${stderr}" >&2;
	echo "ERROR: Can't read Version" >&2;
	exit 1;
fi;

files=$(find ${path}/upgrade -name "*.psql" | sort -rn);
if [ ! -z "$files" ]; then
	filename=$(basename $(echo "$files" | grep '[0-9]\{1,4\}_[0-9]\{1,4\}_[0-9]\{4\}-.*\.psql$' | head -n1));
else
	echo "No upgrade patches. Nothing to do !";
	exit 0;
fi
ending_version=${filename%%-*};
echo "DONE"
text_1="    Actual DB version is : ";
text_2="    Going to version : ";
let text_col=${#text_1}+${#starting_version}
print_aligned "${text_1}" "${starting_version}" text_col
print_aligned "${text_2}" "${ending_version}" text_col


echo -n "Checking if schema is valid...";
catch stdout stderr diff -b -c3 <(sudo -u postgres -- pg_dump -d ${DATABASE_NAME} -s | sed -e '/^--/d' -e '/^$/d') <(sed -e '/^--/d' -e '/^$/d' ${path}/${ref_schema_path}/${SUBDIR}_${starting_version}.psql);
if [ $? != 0 ]; then
	echo "FAIL";
	echo "${stdout}";
	echo "${stderr}" >&2;
	echo "ERROR: Schema is not valid" >&2;
	exit 1;
fi;

echo "DONE"

if [ ${starting_version} == ${ending_version} ]; then
	echo "Already in the lastest version. Nothing to do !";
	re_grant_database_access
	echo "Database is now up-to-date (${ending_version})"
	exit 0;
fi

echo -n "Revoking database access and close active connections...";
catch stdout stderr sudo -u postgres -- psql ${DATABASE_NAME} -X --pset pager=off -v ON_ERROR_STOP=1 -v database_name=${DATABASE_NAME} -q -1 -f ${path}/revoke_connect_and_kick_active_connection.psql
if [ $? != 0 ]; then
	echo "FAIL";
	echo "${stdout}";
	echo "${stderr}" >&2;
	echo "ERROR: Something failed in revoke and kick" >&2;
	exit 1;
fi;
echo "DONE"

for db_patch in $(ls -v ${path}/upgrade/*.psql | grep '[0-9]\{1,4\}_[0-9]\{1,4\}_[0-9]\{4\}-.*\.psql$'); do
	filename=$(basename $db_patch);
	version=${filename%%-*}
	if is_higher_version $starting_version ${version}; then
		echo -n "Applying $filename...";
		catch stdout stderr sudo -u postgres -- psql ${DATABASE_NAME} -X --pset pager=off -v ON_ERROR_STOP=1 -q -1 -v file_name=\'$db_patch\' -f $db_patch;
		if [ $? != 0 ]; then
			echo "FAIL"
			echo "${stderr}" >&2;
			exit 1;
		fi;
		if [ -n "$stdout" ]; then
			echo -n "$stdout...";
		fi;
		echo "DONE";
		echo -n "    Checking if schema is valid after patch (${version})...";
		catch stdout stderr diff -b -c3 <(sudo -u postgres -- pg_dump -d ${DATABASE_NAME} -s | sed -e '/^--/d' -e '/^$/d') <(sed -e '/^--/d' -e '/^$/d' ${path}/${ref_schema_path}/${SUBDIR}_${version}.psql);
		if [ $? != 0 ]; then
			echo "KO"
			echo "${stderr}" >&2;
			echo "ERROR: Schema is not valid" >&2;
			exit 1;
		fi;
		last_update_version_file=${db_patch}
		echo "DONE"
	fi;
done;

echo -n "Getting DB versions...";
catch stdout stderr sudo -u postgres -- psql ${DATABASE_NAME} -X --pset pager=off -v ON_ERROR_STOP=1 -q -1 -t -c "SELECT format('%s_%s_%04s', A.major, A.minor, to_char(A.point, 'fm0000')) AS version FROM (SELECT * FROM schemachangelog ORDER BY id DESC LIMIT 1) AS A;";
db_version=${stdout/ /}
if ! echo "${db_version}" | grep -q '[0-9]\{1,4\}_[0-9]\{1,4\}_[0-9]\{4\}'; then
	echo "FAIL";
	echo "${stdout}";
	echo "${stderr}" >&2;
	echo "ERROR: Can't read Version" >&2;
	exit 1;
fi;
echo "DONE"

echo -n "Checking database version...";
if [ "${ending_version}" != "${db_version}" ]; then
	echo "FAIL"
	echo "ERROR: Something failed version does not match..." >&2;
	exit 1;
fi;
echo "DONE"

re_grant_database_access;

echo "Database is now up-to-date (${ending_version})"
