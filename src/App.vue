<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand-lg navbar-light bg-cyan">
        <div class="container-fluid">
          <a class="navbar-brand">
            <i class="fa fa-columns" aria-hidden="true"></i>
            Columns</a
          >
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <a class="navbar-brand me-auto mb-2 mb-lg-0">
              <i class="fa fa-line-chart" aria-hidden="true"></i> Plotter
            </a>
          </div>
        </div>
      </nav>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f6f9ff;
  height: 100vh;
  position: relative;
}
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .navbar-brand {
    color: #012970;
    margin-left: 10px;
  }
  .bg-cyan {
    background: #f6f9ff;
    box-shadow: 0 0 15px 0 #023b6a1a;
  }
}
</style>
