function resource(value, id_temp) {
this.type = "resource";

this.id = "temp";
this.value = value;
this.id_temp = id_temp;

this.structure = ["INT","VARCHAR","INT"];
}

resource.prototype.test = function () {

};
