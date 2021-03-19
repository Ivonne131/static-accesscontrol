module.exports = {
    users: [
      { id: 1, name: 'Kyle', password:"123", role:"basic"},
      { id: 2, name: 'Sally', password:"123", role:"supervisor"},
      { id: 3, name: 'Joe', password:"123", role:"admin" }
    ],
    profiles: [
      { id: 1, name: "Kyle's profile", userId: 1 },
      { id: 2, name: "Sally's profile", userId: 2 },
      { id: 3, name: "Joe's profiles", userId: 3 }
    ]
  }