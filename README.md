来自 [Full Modern React Tutorial - YouTube](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d)

## React 表达式

`{}` 中的表达式不能为普通对象或布尔值等。但可以是 `string` 或 `number`，也可以是他们构成的数组。

## 关于控件的 CSS 属性的继承

如果不是使用 `* {}` 的方式指定的颜色，那么 `a` 元素不会默认从 `body` 中继承颜色。包括伪类也要进行单独设置，如 `hover` `active` 等。

```css
.navbar a {
  color: inherit;
}
```

## 从

这样设置 `age` 也是可以的：

```jsx
<button onClick={() => setAge(age + 1)}>{age}</button>
```

为了增强复用性，将 `pending` 和 `error` 的代码提取出来，原来的代码是：

```jsx
const [pending, setPending] = useState(true)
const [error, setError] = useState()

useEffect(() => {
  // getBlogs().then(setBlogs) 流畅的英语：获得博客内容然后设置内容、处理错误、最后取消加载状态
  getBlogs().then(setBlogs).catch(setError).finally(
    () => setPending(false)
  )
}, [])
```

## 异步函数对于修改已经挂载的组件

传入异步函数中的回调函数一定会在将来的某个时间执行，并且一定会执行。所以如果为一个异步函数传入修改组件状态的方法，那么可能存在组件已经卸载，但仍然会调用该方法。

由于 JavaScript 的单线程特性，所有函数中的代码的总是进行同步执行，不可能出现中断的情况。

```js
(() => {
  statement1
  statement2
  statement3
  statement4
})()
```

不管上面的函数耗费多长的时间执行，其中 `statement` 总是会一步一步进行。而不会在执行 `A` 的过程中切换到某个已完成的异步回调函数。

因此只要保证回调函数增加一层判断即可，并且该判断一定要引用一个外部的状态，从而避免回调函数被执行。

```js
// 一定会被执行的 `f` 函数
const f = () => console.log('`f` invoked')
setTimeout(f, 2000)

// 可以被「取消」的 `g` 函数
let forth = true
const g = () => console.log('`g` invoked')
setTimeout(() => forth && g(), 2000)
setTimeout(() => forth = false, 1000)
```

> JavaScript 的闭包持有的一直是引用，而非值。不要和 Java 中必须持有常量搞混了。

`fetch` API 也可以提前取消网络状态，当然这是 API 底层实现的。否则普通的 `fetch` 调用了就是调用了，网络请求无法中途取消，回调函数一定会执行。

```js
useEffect(() => {
  const abortController = new AbortController()
  fetch('url', { signal: abortController.signal })
  return abortController.abort()
})
```

需要注意的是尽管每个函数内部是连续执行完成的，但函数之间可不一定。如：

```js
Promise.resolve().then(f).then(g)
```

在 `f` 和 `g` 中间可能有别的函数在执行，如恰好进行组件卸载的函数。如果 `f` 是同步函数，也可能存在这种情况。尽管这种可能性比较小（Promise 的回调优先级高），也需要避免。

解决方法还是为每一个 `then()` 中的回调进行状态检测，避免对已经卸载的组件操作。

## 使用自定义钩子

`useFetch` 这个钩子也可以直接将数据内置，这样返回的应该是 `[data, loading, error]`，返回一个对象也是可以的，对象可以更加灵活的选取需要的内容。

## Tips

使用箭头函数（stateless function）更加方便重构，比如将一个表达式中的代码重构至一个新的组件。
