module.exports = {
  name: 'addTestUser',
  description: 'This is used to simulate adding a user to the server event',
  execute(client, message, args) {
    console.log('Adding test user');
    client.emit('guildMemberAdd', message.member);
  },
};
