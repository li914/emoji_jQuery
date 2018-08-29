#!/bin/bash

###批量修改文件后缀
###author li914
read -p "输入需要修改的文件所在目录：" dir

cd $dir

dir=$(eval pwd)
echo "当前脚本执行所在目录："$dir
read -p "输入需要修改的文件后缀：" oldsuffix
read -p "输入需要生成的文件后缀：" newsuffix
a=0
for file in $(ls $dir | grep .${oldsuffix})
    do
        a=$[$a+1]
        name=$(ls ${file} | cut -d. -f1)
        mv $file ${name}.${newsuffix}
    done
echo "change ${oldsuffix} to ${newsuffix} successd!修改了${a}个文件"

