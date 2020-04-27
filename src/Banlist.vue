<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="bans"
                v-if="!err"
                :server-items-length="banCount"
                :options.sync="options"
                :loading="loading"
                must-sort
        >
            <template v-slot:item.created="{ item }">
                <div>{{$moment.unix(item.created).format("DD/MM/YYYY")}}</div>
            </template>

            <template v-slot:item.length="{ item }">
                <div>{{item.length/60}}</div>
            </template>

        </v-data-table>
        <p v-else>{{err}}</p>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Banlist",

        data: function () {
            return {
                bans: undefined,
                err: "",
                banCount: undefined,
                options: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['created'],
                    sortDesc: [true],
                    multiSort: false,
                },
                loading: false,
            }
        },

        mounted() {
            this.loading = true;
            axios.get(`http://localhost:8081/api/bans?page=${this.options.page}&itemsPerPage=${this.options.itemsPerPage}&orderBy=${this.options.sortBy[0]}&desc=${this.options.sortDesc[0]}`,).then(response => {
                this.bans = response.data.data;
                this.banCount = response.data.bancount;
                this.loading = false;
            }).catch(err => {
                this.err = err;
            });
        },

        watch: {
            options: {
                handler(){
                    this.loading = true;
                    axios.get(`http://localhost:8081/api/bans?page=${this.options.page}&itemsPerPage=${this.options.itemsPerPage}&orderBy=${this.options.sortBy[0]}&desc=${this.options.sortDesc[0]}`,).then(response => {
                        this.bans = response.data.data;
                        this.banCount = response.data.bancount;
                        this.loading = false;
                    }).catch(err => {
                        this.err = err;
                    });
                },
                deep: true
            }
        },

        computed: {
            headers() {
                return [
                    {text: 'Дата', value: 'created', width: 25},
                    {text: 'Игрок', value: 'name', width: 25},
                    {text: 'Администратор', value: 'user', width: 25},
                    {text: 'Срок', value: 'length', width: 25},
                ]
            }
        }
    }
</script>

<style scoped>

</style>