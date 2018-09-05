<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/tiles-grid">Tiles Grid</router-link> |
            <router-link to="/chess-grid">Chess Grid</router-link> |
            <router-link to="/list-box">List Box</router-link> |
            <router-link to="/google-api">Google API</router-link> |
            <router-link to="/error">Error Page</router-link>
        </div>
        <div class="page-content">
            <slot/>
        </div>
    </div>
</template>

