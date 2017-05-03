function Resource(id, name, groupType) {
  this.id      = id;
  this.name    = name;
  this.groupType   = groupType;

  this.type    = "Resource";
  this.row;
  this.projectID;
  this.add     = "X";
}
