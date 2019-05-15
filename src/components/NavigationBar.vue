<template>
  <nav id="navbar">
    <a href>logo</a>
    <ul>
      <li>
        <a href>link</a>
      </li>
      <li>
        <a href>link</a>
      </li>
      <li>
        <a href>link</a>
      </li>
      <li>
        <a href>link</a>
      </li>
      <li>
        <a href>link</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss">
#navbar {
  width: 18em;
  background-color: rgba(1, 22, 39, 1);
  height: 100vh;
  overflow-y: auto;
  ul {
    list-style: none;
    padding: 0;
  }
  ul li a {
    color: #fff;
    text-decoration: none;
    display: block;
    padding: 0.5rem 1rem 0.5rem 2rem;
    &:hover {
      background-color: rgb(4, 33, 56);
    }
  }
}
</style>