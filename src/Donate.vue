<template>
    <v-app>
        <v-col align-self="center" style="width: 20%" class="d-flex; flex-column">
            <v-form class="align-center; justify-center" ref="donateForm">
                <v-select label="Вип-группа" :items="Object.keys(pricelist)" v-model="selected.selectedGroup" outlined :rules="[rules.required]"></v-select>
                <v-select label="Время" :items="timeOptions" v-model="selected.selectedTime" outlined :rules="[rules.required]"></v-select>
                <v-switch label="NON-STEAM" v-model="nonSteam"></v-switch>
                <v-text-field label="ACCOUNT_ID" v-model="steamId" outlined type="number" :rules="[rules.required, rules.overflowed]"></v-text-field>
                <v-btn x-large color="green" @click="buy" style="width: 100%;">Оплатить<br />{{price}}р</v-btn>
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
                selected: {
                  selectedGroup: undefined,
                  selectedTime: undefined
                },
                timeOptions: [
                    {text: "Неделя", value: 7},
                    {text: "30 дней", value: 30},
                    {text: "90 дней", value: 90}
                ],
                steamId: undefined,
                validSteamId: undefined,
                nonSteam: false,
                price: 0,
                pricelist: {
                  "VIP SILVER": {7: 50, 30: 150, 90: 400},
                  "VIP GOLD": {7: 100, 30: 300, 90: 800},
                  "VIP PLATINUM": {7: 200, 30: 500, 90: 1300}
                },
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
            buy(){
              if (!this.$refs.donateForm.validate()){
                return;
              }
              axios.get(`http://localhost:80/api/generate_link?sum=${this.price}&account=${this.validSteamId}&desc=Статус ${this.selected.selectedGroup} на ${this.selected.selectedTime} дней`).then(response => {
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

            selected: {
                handler(newSelected){
                  if(newSelected.selectedTime && newSelected.selectedGroup){
                    this.price = this.pricelist[newSelected.selectedGroup][newSelected.selectedTime];
                  }
                },
                deep: true
            }
        },
    }
</script>

<style scoped>

</style>
