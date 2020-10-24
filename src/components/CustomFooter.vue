<template>
    <div class="footer">
        <p>Made by: Oskar Oja {{year}}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            year: new Date().getFullYear()
        }
    }
}
</script>
<style lang="scss" scoped>
p {
    text-align: center;
    font-size: 0.8rem;
    margin: 0;
    font-weight: bold;
    color: #c5c5c5;
}
</style>