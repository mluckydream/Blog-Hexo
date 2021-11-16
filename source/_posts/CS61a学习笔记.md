---
title: CS61a 学习笔记
date: 2021-11-15 23:19:30
layout: 
  - tags
  - categories
categories:
  - Notes
  - Basic
tags:
  - Basic
  - CS61a
---

DBC(Don't Be Clueless)

## functions

### print (side effects)

```python
Print(print(1), print(2)) 输出？

1
2
None
None
```

### function

```python
def id(x):
	return x
print(id(id)(id(13)))

13 
```

### false

- False
- None
- 0 
- Empty strings、sets、tuples, and dictionaries

```python
>>> b == None  # Equality operator
True
>>> b is None  # Identity operator
False
```

### if... elif

```python
def signum(x):
	return 1 if x > 0 else 0 if x == 0 else -1
```



```python
def add_sq(assum, k, n):
  if k > n:
    return accum
  else:
    return add_sq(assum + k ** 2, k + 1, n)
print(add.sq(0, 1, 100))
```



```python
def nun_digits(a, radix = 10):
  a_count = 1
  while a >= radix:
    a = a // radix
    a_count += 1
  return a_acount
```

## lab01

```python
def how_big(x):
    if x > 10:
        print('huge')
    elif x > 5:
        return 'big'
    elif x > 0:
        print('small')
    else:
        print('nothing')

how_big(7)



# 'big'
```

## enviroments

```python
def(p, k):
  def g():
    print(k)
   if k == 0:
    f(g,1)
   else:
    p()
f(None, 0)



# 0
```





```python
def f(x):
  x = x + 1
y = 4
f(y)
x = 2
f(x)
print(y, x)


# 4 2
```





```python
def f(x):
  def g(y):
    x = y
  g(4)
  return x
print(f(3))


# 3
```





```python
def print_sums(n):
  print(n)
  def next_sum(k):
    return print_sums(n + k)
print_sums(1)(3)(5)

"""
1
4
9
"""
```

## lambda

A lambda expression does not contain return statements or any statements at all

```python
higher_order_lambda = lambda f: lambda x: f(x)
g = lambda x: x * x
higher_order_lambda(g)(2) # Which argument belongs to which function call

# >>> 4

higher_order_lambda(2)(g) # Which argument belongs to which function call


# >>> Error

```



```python
call_thrice = lambda f: lambda x: f(f(f(x)))
call_thrice(lambda y: y + 1)(0)
```

