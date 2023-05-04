#!/bin/bash
DIR=$(readlink -m $(dirname ${0}))
source ${DIR}/lib_functions.sh;
SUBDIR=ressourcesRelationnelles
DATABASE_NAME=${1:-${SUBDIR}}
path=${DIR}
pgd_version=$(pg_dump --version | awk '{print $3}')
case $pgd_version in
 	1[3-4]\.[0-9][0-9])
 		ref_schema_path=ref_schema/pg-13
 	;;
 	*)
 		echo "ERROR: pg_dump unsupported Version (${pgd_version})" >&2;
 		exit 1;
	;;
esac;

# INSERT INTO schemachangelog (major, minor, point, script_name, script_status, ts) VALUES (4, 0, 38, 'Initial install', 0, CURRENT_TIMESTAMP);
schema_version=$(awk -F'[(,)]' ' /INSERT INTO schemachangelog / { printf("%d.%d.%d",$9,$10,$11); }' ${DIR}/${SUBDIR}/add_changelog.psql);
schema_version_check=$(awk -F'[(,)]' ' /INSERT INTO schemachangelog / { printf("%d_%d_%04d",$9,$10,$11); }' ${DIR}/${SUBDIR}/add_changelog.psql);

if [ "${DATABASE_NAME}" != "${SUBDIR}" ]; then
	if [ "${schema_version_check}" != "${DATABASE_NAME:${#SUBDIR}+1:8}" ]; then # +1 is for underscore character
		echo "####################################################################################";
		echo "####################################################################################";
		echo "####################################################################################";
		echo "###                                                                              ###";
		echo "###                         WARNING DATABASE NAME DO NOT                         ###";
		echo "###                         MATCH VERSION !!!!!!!!!!!!!!                         ###";
		echo "###                                                                              ###";
		echo "####################################################################################";
		echo "####################################################################################";
		echo "####################################################################################";
		echo "${schema_version_check} != ${DATABASE_NAME:${#SUBDIR}+1:8}"; # +1 is for underscore character
	fi
fi

echo "Create Database '${DATABASE_NAME}' version ${schema_version}"
sudo -u postgres -- psql -X --pset pager=off -v ON_ERROR_STOP=1 -v database_name=${DATABASE_NAME} -q -f ${DIR}/${SUBDIR}/full_${SUBDIR}.psql
ret=$?
if [ $ret != 0 ]; then
	echo "ERROR: Failed creating database..." >&2;
	exit $ret;
fi;

if [ "${DATABASE_NAME}" != "${SUBDIR}" ]; then
	if [ "${schema_version_check}" != "${DATABASE_NAME:${#SUBDIR}+1:8}" ]; then # +1 is for underscore character
		echo "####################################################################################";
		echo "####################################################################################";
		echo "####################################################################################";
		echo "###                                                                              ###";
		echo "###                         WARNING DATABASE NAME DO NOT                         ###";
		echo "###                         MATCH VERSION !!!!!!!!!!!!!!                         ###";
		echo "###                                                                              ###";
		echo "####################################################################################";
		echo "####################################################################################";
		echo "####################################################################################";
		echo "${schema_version_check} != ${DATABASE_NAME:${#SUBDIR}+1:8}"; # +1 is for underscore character
	fi
fi

echo -n "Checking if schema is valid...";
catch stdout stderr diff -b -c3 <(sudo -u postgres -- pg_dump -d ${DATABASE_NAME} -s | sed -e '/^--/d' -e '/^$/d') <(sed -e '/^--/d' -e '/^$/d' ${path}/${ref_schema_path}/${SUBDIR}_${schema_version_check}.psql);
if [ $? != 0 ]; then
	echo "FAIL";
	echo "${stdout}";
	echo "${stderr}" >&2;
	echo "ERROR: Schema is not valid" >&2;
	exit 1;
fi;

echo -e "DONE\n"

echo -e "Created Database ${DATABASE_NAME} Successfully"
echo -e "    from Schema version ${schema_version}\n\n"
exit 0
