typeof and instanceof: 用于细化的类型查询
keyof: 获取对象的键。keyof T 是一个运算符，告诉您 的哪些值 k 可以用于 obj[k]。
这里有些误解。
O[K]: 属性查找
[K in O]: 映射类型
+or-或 readonlyor ?：加法和减法以及只读和可选修饰符
x ? Y : Z：泛型类型的条件类型、类型别名、函数参数类型
!: 可空类型的非空断言
=：泛型类型的泛型参数默认值
as: 类型断言
is: 函数返回类型的类型保护

const a = new A()

a:A

Awaited: 模拟行为 await
Capitalize: 将字符串文字类型的第一个字符转换为大写
ConstructorParameters: 类构造函数的参数类型的元组
Exclude：从另一种类型中排除一种类型
Extract：选择可分配给另一种类型的子类型
InstanceTypenew：您从类构造函数中获得的实例类型
Lowercase: 将字符串文字类型转换为小写
NonNullable:从一个类型中排除 null 和 undefined T extneds {}
Omit：构造具有另一种类型属性的类型。
OmitThisParameter: 从函数类型中删除“this”参数。
Parameters: 函数参数类型的元组
Partial：使对象中的所有属性可选
Readonly: 将对象中的所有属性设置为只读
ReadonlyArray: 创建给定类型的不可变数组
Pick：对象类型的子类型及其键的子集
Record: 从键类型到值类型的映射
Required: 使对象中的所有属性成为必需
ReturnType: 函数的返回类型
ThisParameterType: 提取函数类型的“this”参数的类型
ThisType：上下文“this”类型的标记
Uncapitalize: 将字符串文字类型的第一个字符转换为小写
Uppercase: 将字符串文字类型转换为大写

// store -> container
// currentState -> \_value
// action -> f
// currentReducer -> map
// middleware -> IO functor（异步）
