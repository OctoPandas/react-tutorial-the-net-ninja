
##

`{}` can only output strings or numbers.

```
.navbar a {
  color: inherit;
}
```

如果不是使用 `* {}` 的方式指定的颜色，那么 `a` 元素不会默认从 `body` 中继承颜色。包括伪类也要进行单独设置，如 `hover` `active` 等。

这样设置 `age` 也是可以的：

```jsx
<button onClick={() => setAge(age + 1)}>{age}</button>
```

为了增强复用性，将 `pending` 和 `error` 的代码提取出来，原来的代码是：

```jsx
const [pending, setPending] = useState(true)
const [error, setError] = useState()

useEffect(() => {
  // getBlogs().then(setBlogs) 流畅的英语
  getBlogs().then(setBlogs).catch(setError).finally(
    () => setPending(false)
  )
}, [])
```

这个钩子也可以直接将数据内置，这样返回的应该是 `[data, loading, error]`，返回一个对象也是可以的，对象可以更加灵活的选取需要的内容。

为什么使用箭头函数？使用箭头函数更加方便重构，比如将一个组件中的代码重构至一个新的组件。
