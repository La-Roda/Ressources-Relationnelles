catch()
{
eval "$({
__2="$(
  { __1="$("${@:3}")"; } 2>&1;
  ret=$?;
  printf '%q=%q\n' "$1" "$__1" >&2;
  exit $ret
  )"
ret="$?";
printf '%s=%q\n' "$2" "$__2" >&2;
printf '( exit %q )' "$ret" >&2;
} 2>&1 )";
}

is_higher_version(){
ref=$1
chkd=$2

ref_major=${ref%%_*}
temp=${ref#*_}
ref_minor=${temp%%_*}
ref_point=${ref##*_}
chkd_major=${chkd%%_*}
temp=${chkd#*_}
chkd_minor=${temp%%_*}
chkd_point=${chkd##*_}

if [ $ref_major -lt $chkd_major ]; then
	return 0;
elif [ $ref_major -eq $chkd_major -a $ref_minor -lt $chkd_minor ]; then
	return 0;
elif [ $ref_major -eq $chkd_major -a $ref_minor -eq $chkd_minor -a $ref_point -lt $chkd_point ]; then
	return 0;
else
	return 1;
fi;

}

print_aligned() {
	MSG_LEFT="$1"
	MSG_RIGHT="$2"
	MAX_COL=$3
	let REST_COL=${MAX_COL}-${#MSG_LEFT}-${#MSG_RIGHT}
	printf "%s%${REST_COL}.${REST_COL}s%s\n" "${MSG_LEFT}" "" "${MSG_RIGHT}"
}
