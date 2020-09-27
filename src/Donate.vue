<template>
    <v-app>
        <v-col align-self="center" style="width: 20%" class="d-flex; flex-column">
            <v-form class="align-content-center" ref="donateForm">
                <v-select label="Вип-группа" :items="vipGroups" v-model="selectedGroup" outlined :rules="[rules.required]"></v-select>
                <v-select label="Время" :items="timeOptions" v-model="selectedTime" outlined :rules="[rules.required]"></v-select>
                <v-switch label="NON-STEAM" v-model="nonSteam"></v-switch>
                <v-text-field label="ACCOUNT_ID" v-model="steamId" outlined type="number" :rules="[rules.required, rules.overflowed]"></v-text-field>
                <v-container class="d-flex justify-space-between">
                    <v-btn small color="primary" @click.native="calculatePrice">Рассчитать стоимость</v-btn>
                    {{price}}
                    <v-btn small color="green" @click="buy">Оплатить</v-btn>
                </v-container>
            </v-form>
        </v-col>
    </v-app>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Donate",
        data: function () {
            return {
                vipGroups: [
                    "VIP SILVER",
                    "VIP GOLD",
                    "VIP PLATINUM"
                ],
                selectedGroup: undefined,
                timeOptions: [
                    {text: "Неделя", value: 7},
                    {text: "30 дней", value: 30},
                    {text: "90 дней", value: 90}
                ],
                selectedTime: undefined,
                steamId: undefined,
                validSteamId: undefined,
                nonSteam: false,
                price: 0,
                error: undefined,
                rules: {
                    required: value => !!value || 'Обязательно',
                    overflowed: value => {
                        if(value > 2147483647){
                            if(this.nonSteam){
                                return true
                            } else {
                                return 'Слишком большое значение, возможно вы non-steam?'
                            }
                        } else {
                            return true
                        }
                    }
                },
            }
        },
        methods: {
            calculatePrice(){
                switch (this.selectedGroup) {
                    case "VIP SILVER":
                        switch (this.selectedTime) {
                            case 7:
                                this.price = 50;
                                return;
                            case 30:
                                this.price = 150;
                                return;
                            case 90:
                                this.price = 400;
                                return;
                            default:
                                this.error = "Выберите время!"
                        }
                        return;
                    case "VIP GOLD":
                        switch (this.selectedTime) {
                            case 7:
                                this.price = 100;
                                return;
                            case 30:
                                this.price = 300;
                                return;
                            case 90:
                                this.price = 800;
                                return;
                            default:
                                this.error = "Выберите время!"
                        }
                        return;
                    case "VIP PLATINUM":
                        switch (this.selectedTime) {
                            case 7:
                                this.price = 200;
                                return;
                            case 30:
                                this.price = 500;
                                return;
                            case 90:
                                this.price = 1300;
                                return;
                            default:
                                this.error = "Выберите время!"
                        }
                        return;
                    default:
                        this.error = "Выберите группу!"
                }
            },
            buy(){
              if (!this.$refs.donateForm.validate()){
                return;
              }
              axios.get(`http://localhost:80/api/generate_link?sum=${this.price}&account=${this.validSteamId}&desc=Статус ${this.selectedGroup} на ${this.selectedTime} дней`).then(response => {
                window.open(response.data, '_blank');
              }).catch(err => {
                console.log(err);
              });
            }
        },
        watch: {
            steamId: {
                handler(newSteamId) {
                    if (this.nonSteam) {
                        if (newSteamId > 2147483647) {
                            this.validSteamId = newSteamId - 4294967296
                        }
                    } else {
                        this.validSteamId = newSteamId
                    }
                }
            },

        },
    }
</script>

<style scoped>

</style>
