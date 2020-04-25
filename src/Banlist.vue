<template>
    <div>
        <v-data-table v-model="bans" v-if="!err"></v-data-table>
        <p v-else>{{err}}</p>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Banlist",

        data: function(){
            return {
                bans: {},
                err: ""
            }
        },

        mounted() {
            axios.get('./api').then(response => {
                this.bans = response;
            }).catch(err => {
                this.err = err;
            });
        }
    }
</script>

<style scoped>

</style>