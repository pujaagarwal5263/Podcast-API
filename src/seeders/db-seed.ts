import { faker } from "@faker-js/faker";
import { User } from "../models/userSchema";
import { Podcast } from "../models/podcastSchema";
import IPodcastItem from "../types/podcastInterface";
import IUserItem from "../types/userInterface";

//Inserting random 100 user's data
async function addUserData() {
  var UserArray: Array<IUserItem> = [];
  for (let i = 0; i < 100; i++) {
    let name = faker.name.firstName();
    let email = faker.internet.email();
    let password = faker.internet.password();
    let contact = faker.phone.number();

    await User.create({
      name: name,
      email: email,
      password: password,
      contact: contact,
    });
  }
  console.log("User DB seeding done!!");
  
}
addUserData();

//Inserting 100's random Podcast data
async function addPodcastData() {
    var PodcastArray: Array<IPodcastItem> = [];
    for (let i = 0; i < 100; i++) {
      let podcast_id= faker.datatype.uuid()
      let podcast_name= faker.name.firstName();
      let channel_id= faker.datatype.uuid()

      await Podcast.create({
        podcast_id: podcast_id,
        podcast_name: podcast_name,
        channel_id: channel_id
      });
    }
    console.log("Podcast DB seeding done!!");
  }
  addPodcastData();