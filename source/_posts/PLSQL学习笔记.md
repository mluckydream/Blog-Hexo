---
title: PL/SQL 学习笔记
date: 2019-01-07 22:19:30
layout: 
  - tags
  - categories
categories:
  - Database
  - PLSQL
tags:
  - Oracle
  - Notes
---

## 基础语法

#### SQL99 

- （1）**是操作所有关系型数据库的规则**
- （2）是第四代语言
- （3）**是一种结构化查询语言**
- （4）只需发出合法合理的命令，就有对应的结果显示

#### SQL

- （1）**交互性强，非过程化**
- （2）数据库操纵能力强，只需发送命令，无需关注如何实现
- （3）多表操作时，自动导航简单
- （4）容易调试，错误提示，直接了当
- （5）**SQL强调结果**



#### PLsql 是什么

- 是专用于Oracle服务器，在SQL基础之上，**添加了一些过程化控制语句，叫PLSQL**

- 过程化包括有：类型定义，判断，循环，游标，异常或例外处理。。。

- **PLSQL强调过程**

  

#### 为什么要用PLSQL

- 因为SQL是第四代命令式语言，**无法显示处理过程化的业务，所以得用一个过程化程序设计语言来弥补SQL的不足之处**，
- SQL和PLSQL不是替代关系，是弥补关系

### PLsql 语法

declare和exception都是可以省略的，`begin和end;/`是不能省略的。

#### 显示PLsql执行结果

`set serveroutput on/off`

#### 变量

##### number

##### varchar2

#### 属性类型

##### %type

##### %rowtype

##### 何时使用%type，何时使用%rowtype？

- 当定义变量时，**该变量的类型与表中某字段的类型相同时，可以使用%type**
- 当定义变量时，该变量与整个表结构完全相同时，可以使用%rowtype，此时通过变量名.字段名，可以取值变量中对应的值
- 项目中，常用%type

### 条件判断

#### 基本语法

`if 条件 then`
 `业务逻辑`
`elsif 条件 then`
 `业务逻辑`
`else`
 `业务逻辑` 
`end if;`



#### 小练习

##### 工资在 3000 或 5000

`Sal in (3000,5000)`

##### 01.判断工作日还是休息日

```plsql
declare
    pday varchar2(10);
begin
    select to_char(sysdate,'day') into pday from dual;
    dbms_output.put_line('今天'||pday);
    if pday in ('星期六','星期日') then
    dbms_output.put_line('休息日');
    else
    dbms_output.put_line('工作日');
    end if;
end;
/
```

##### 02.工资<1000，则在原来的基础上加200，如果 1000<=sal<=2000，加400，否则 加600

```plsql
declare
	  psal number(10);
	  pempno number(10) := &pempno;
begin
	  select sal into psal from emp where empno = pempno;
    if psal < 1000 then
    	 sal:=sal+200;
    elsif psal < 2000 then
    	 psal:=sal+400;
    else
       sal:=sal+600;
    end if;
    dbms_output.put_line('调薪后工资'||psal);
end;
/
```



### 循环

#### While 循环

```plsql
WHILE  total  <= 25000  
LOOP
    total : = total + salary;
END  LOOP;
```

#### Loop循环

```plsql
Loop
   exit [when 条件成立];
   total:=total+salary;
end loop;
```

#### For循环

```plsql
for i in   1 . . 3  
loop
语句序列 ;
end loop ; 
```

#### 小练手

##### 01.使用loop循环，向emp表中插入1000条记录

```plsql
declare
    i number(4) := 1;
begin    
    loop
    		exit when i>1000;
        insert into emp(empno,ename) values(i,'hello');
        i := i + 1;
    end loop;   
end;
/
```

#####02.使用loop循环显示1-10

```plsql
declare
    i number(2) := 1;
begin
    loop
        --当i>10时，退出循环
        exit when i>10;
        --输出i的值
        dbms_output.put_line(i);
        --变量自加
        i := i + 1;  
    end loop;
end;
/
```

#####03.使用while循环显示1-10

```plsql
declare
    i number(2) := 1;
begin
    while i<11 
    loop
        dbms_output.put_line(i);
        i := i + 1;
    end loop;
end;
/
```

##### 04.使用for循环显示20-30

```plsql
declare
    i number(2) := 20;
begin
    for i in 20 .. 30
    loop
        dbms_output.put_line(i);
    end loop;
end;
/
```

##### 05.直角三角形

```plsql
declare
    i number(2) := 1;
begin
  for i in 1 .. 5 loop
    for j in 1 .. i loop
      dbms_output.put('*');
    end loop;
    dbms_output.put_line('');
  end loop;
end;
/
```

##### 

##### 06. 九九乘法表

```plsql
declare
    i number(2):= 1;
    j number(2):= 1;
begin
    for i in 1 .. 9
    loop
    	for j in 1 .. 9
    	
    		loop  			      			dbms_output.put(i||'*'j||'='||i * j || chr*(9)'	');
    		end loop;
      			 				dbms_output.put_line('');
    end loop;
end;
/
```

##### 07. 打印等腰三角形

```plsql
declare
    i number(2):=1;
    j number(2):=1;
    k number(2):=1;
begin
  for i in 1..5 
  	loop
    for j in 1 ..5-i 
    loop
      dbms_output.put(' ');
    end loop;
    for k in 1 ..2*i-1 
    loop
      dbms_output.put('*');
    end loop;
    dbms_output.put_line('');
  end loop;
end;
/
```



##### 08. 打印菱形

```plsql
declare
    i number(2):=1;
    j number(2):=1;
    k number(2):=1;
begin
  --上部分
  for i in 1..5 loop
    for j in 1 ..5-i 
    loop
      dbms_output.put(' ');
    end loop;
    for k in 1 ..2*i-1 
    loop
       dbms_output.put('*');
    end loop;
    dbms_output.put_line('');
  end loop;
  --下部分
  for i in reverse 1..5 
  loop
    for j in 1 ..5-i
    loop
      dbms_output.put(' ');
    end loop;
    for k in 1 ..2*i-1
    loop
       dbms_output.put('*');
    end loop;
    dbms_output.put_line('');
  end loop;
end;
/
```

##### 

##### 08. 打印空心菱形（作业）

```plsql
declare
    i number(2):=1;
    j number(2):=1;
    k number(2):=1;
begin
  --上部分
  for i in 1..5 loop
    for j in 1 ..5-i 
    loop
      dbms_output.put(' ');
    end loop;
    for k in 1 ..2*i-1 
    loop
    	 if k in (0,i-1)
    	 then 
       dbms_output.put('*');
       end if;
    end loop;
    dbms_output.put_line('');
  end loop;
  --下部分
  for i in reverse 1..5 
  loop
    for j in 1 ..5-i
    loop
      dbms_output.put(' ');
    end loop;
    for k in 1 ..2*i-1
    loop
       if k in (0,i-1)
    	 then 
       dbms_output.put('*');
       end if;
    end loop;
    dbms_output.put_line('');
  end loop;
end;
/
```

##### 

### 游标

#### 语法

```plsql
CURSOR  光标名  [ (参数名  数据类型[,参数名 数据类型]...)]
      IS  SELECT   语句
```

##### 01.使用无参光标cursor，查询所有员工的姓名和工资【如果需要遍历多条记录时，使用光标cursor，无记录找到使用cemp%notfound】

```plsql
declare
    --定义游标
    cursor cemp is select ename,sal from emp;
    --定义变量
    vename emp.ename%type;
    vsal   emp.sal%type;
begin
    --打开游标，这时游标位于第一条记录之前
    open cemp;
    --循环
    loop
       --向下移动游标一次
       fetch cemp into vename,vsal; 
       --退出循环,当游标下移一次后，找不到记录时，则退出循环
       exit when cemp%notfound;
       --输出结果
       dbms_output.put_line(vename||'--------'||vsal);
    end loop;
    --关闭游标
    close cemp;
end;
/
```

##### 02.使用带参光标cursor，查询10号部门的员工姓名和工资

```plsql
declare
    cursor cemp(pdeptno emp.deptno%type) is select ename,sal from emp where deptno=pdeptno;
    pename emp.ename%type;
    psal emp.sal%type; 
begin 
    open cemp(&deptno);
    loop
        fetch cemp into pename,psal;     
        exit when cemp%notfound;
        dbms_output.put_line(pename||'的薪水是'||psal);
    end loop;
    close cemp;
end;
/
```

##### 03.使用无参光标cursor，真正给员工涨工资，ANALYST涨1000，MANAGER涨800，其它涨400，要求显示编号，姓名，职位，薪水

```plsql
declare
    cursor cemp is select empno,ename,job,sal from emp;
    pempno emp.empno%type;
    pename emp.ename%type;
    pjob   emp.job%type;
    psal   emp.sal%type;
begin
    open cemp;
    loop
        fetch cemp into pempno,pename,pjob,psal;
        exit when cemp%notfound;
        if pjob='ANALYST' then
            update emp set sal = sal + 1000 where empno = pempno;
        elsif pjob='MANAGER' then
            update emp set sal = sal + 800 where empno = pempno;
        else 
        update emp set sal = sal + 400 where empno = pempno;
        end if;
    end loop;
    commit;
    close cemp;
end;
/
```

### 异常、例外

#### 语法

```plsql
在declare节中定义例外   
out_of   exception ;

 在begin节中可行语句中抛出例外  
raise out_of ；

 在exception节处理例外
when out_of then …

```



#### Oracle 预定义异常21个

![Oracle预定义异常](https://img-blog.csdnimg.cn/20201008102454795.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0dsb3JpYV9tNjY2,size_16,color_FFFFFF,t_70#pic_center)

##### 01.使用oracle系统内置例外，演示除0例外【zero_divide】

```plsql
declare
    myresult number;
begin
    myresult := 1/0;
    dbms_output.put_line(myresult);
exception
    when zero_divide then 
     dbms_output.put_line('除数不能为0');
     delete from emp;  
end;
/
```



##### 02.使用oracle系统内置例外，查询100号部门的员工姓名，演示没有找到数据【no_data_found】

```plsql
declare
    pename varchar2(20);
begin
    select ename into pename from emp where deptno = 100;
    dbms_output.put_line(pename);
exception
    when NO_DATA_FOUND then 
     dbms_output.put_line('查无该部门员工');
     insert into emp(empno,ename) values(1111,'ERROR');
end;
/
```

## 存储过程和存储函数

### 语法

#### 过程的语法

```plsql
create [or replace] procedure 过程名[(参数列表)]  
as
        PLSQL程序体；【begin…end;/】
```

#### 函数的语法

```plsql
CREATE [OR REPLACE] FUNCTION 函数名【(参数列表) 】
 RETURN  返回值类型
AS
PLSQL子程序体；

【begin…end;/】
```

**无论是过程还是函数，as关键字都代替了declare关键字。**

##### 创建过程hello world

```plsql
CREATE OR REPLACE PROCEDURE hello
AS
  BEGIN
    dbms_output.put_line('hello world');
  END;
```

#### 调用过程的三种方式：

- exec过程名【SQLPLUS中使用】
- **PLSQL程序调用**
- Java调用

##### 01.创建有参存储过程raiseSalary(编号)，为7369号员工涨10%的工资，演示in的用法，默认in，大小写不敏感

```plsql
CREATE or REPLACE PROCEDURE bb(pempno in NUMBER)
  AS
  BEGIN
    UPDATE EMP
    SET sal = sal * 1.2
    WHERE empno = pempno;

  END;
```

调用：

```plsql
  BEGIN
    bb(7369);
  END;
```

##### 02.创建有参存储过程findEmpNameAndSalAndJob(编号)，查询7788号员工的的姓名，职位，月薪，返回多个值，演示out的用法

创建过程：**在过程中的参数，默认值是IN，如果是输出的话，那么我们要指定为OUT。**

```plsql
CREATE OR REPLACE PROCEDURE find(pempno IN NUMBER, psal OUT VARCHAR2, pename OUT VARCHAR2, pjob OUT VARCHAR2)
AS
  BEGIN
    SELECT
      ename,
      sal,
      job
    INTO pename, psal, pjob
    FROM emp
    WHERE empno = pempno;
  END;
```

调用：在调用的时候，使用到的psal，pname，pjob在调用的时候都没有定义的，因此我们**需要先定义变量后使用！**

```plsql
DECLARE
  psal   emp.sal%TYPE;
  pename emp.ename%TYPE;
  pjob   emp.job%TYPE;

BEGIN
  find(7788, psal, pename, pjob);

  dbms_output.put_line(psal || pename || pjob);

END;/
```

