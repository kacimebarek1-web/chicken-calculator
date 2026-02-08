Vue.createApp({
data(){
return{
show:false,
f:{
numChicks:0, priceChick:0,
feedPrice:0, feedUsed:0,
energy:0, medicine:0,
bedding:0, cleaning:0, rent:0,
shippingPerKg:0,
deadEarly:0, deadMid:0, deadLate:0,
unsold:0,
totalWeight:0, sellPrice:0
}
}
},
methods:{
calculate(){
this.show = true
}
}
}).mount('#app')
