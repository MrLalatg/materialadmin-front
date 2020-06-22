<template>
    <div class="">
        <v-data-table
                :headers="headers"
                :items="bans"
                v-if="!err"
                :server-items-length="banCount"
                :options.sync="options"
                :loading="loading"
                hide-default-footer
                must-sort
                @update:items-per-page="options.page = 1"
                style="width: 80%"
        >
            <template v-slot:item.created="{ item }">
                <div>{{$moment.unix(item.created).format("DD/MM/YYYY")}}</div>
            </template>

            <template v-slot:item.length="{ item }">
                <div>{{item.length !== 0 ? item.length/60 + " мин" : "Навсегда"}}</div>
            </template>

        </v-data-table>
        <p v-else>{{err}}</p>
        <v-divider></v-divider>
        <v-row align="center" class="px-2 pb-0 pt-2">
            <v-col class="d-flex">

            </v-col>
            <v-col class="d-flex" cols="12" sm="1">
                <v-select v-model="options.itemsPerPage" :items="perPageOptions" outlined label="Записей на странице"></v-select>
            </v-col>
        </v-row>
        <div class="text-center pt-0" v-if="!err">
            <v-pagination v-model="options.page" :length="pages" total-visible="10"></v-pagination>
        </div>
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
                perPageOptions: [10, 15, 25, 50, 100],
            }
        },

        mounted() {
            this.loading = true;
            axios.get(`http://localhost:80/api/bans?page=${this.options.page}&itemsPerPage=${this.options.itemsPerPage}&orderBy=${this.options.sortBy[0]}&desc=${this.options.sortDesc[0]}`,).then(response => {
                this.bans = response.data.data;
                this.banCount = response.data.bancount;
                this.loading = false;
            }).catch(err => {
                this.err = err;
            });
        },

        watch: {
            options: {
                handler(newOptions){
                    this.loading = true;
                    const { itemsPerPage, page, sortBy, sortDesc } = newOptions
                    const params = {
                        params: {
                            itemsPerPage,
                            page,
                            sortBy: sortBy[0],
                            sortDesc: sortDesc[0],
                        }
                    }
                    axios.get(`http://localhost:80/api/bans?page=${params.params.page}&itemsPerPage=${params.params.itemsPerPage}&orderBy=${params.params.sortBy}&desc=${params.params.sortDesc}`,).then(response => {
                        this.bans = response.data.data;
                        
                        this.banCount = response.data.bancount;
                        this.loading = false;
                    }).catch(err => {
                        this.err = err;
                    });
                },
                deep: true
            },
        },

        computed: {
            headers() {
                return [
                    {text: 'bid', value: 'bid', width: 25},
                    {text: 'Дата', value: 'created', width: 25},
                    {text: 'Игрок', value: 'name', width: 25},
                    {text: 'Администратор', value: 'user', width: 25},
                    {text: 'Срок', value: 'length', width: 25},
                ]
            },
            pages () {
                const p = Math.ceil( this.banCount / this.options.itemsPerPage )
                console.log(this.banCount, this.options.itemsPerPage, p)
                return p
            },
        }
    }
</script>

<style scoped>

</style>