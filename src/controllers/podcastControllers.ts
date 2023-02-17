import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
const { Podcast } = require("../models/podcastSchema");
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import common from "../utils/common";
import { appConstants } from "../constants/appConstants";

const addNewPodcast: RequestHandler = async (req, res) => {
  try {
    const data = req.body;
    //channel_id is optional. either we can create here or separately taking channel id from client
    const { podcast_name, channel_id } = data;
    if (!podcast_name) {
      return common.Response(
        res,
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST,
        appConstants.RESPONSE_REQUIRED_FIELD_ERROR_MSG,
        null
      );
    }
    const newPodcast = await Podcast.create({
      podcast_id: uuidv4(),
      podcast_name: podcast_name,
      channel_id: channel_id,
    });
    return common.Response(
      res,
      StatusCodes.BAD_REQUEST,
      ReasonPhrases.CREATED,
      appConstants.RESPONSE_POD_SUCCESS_MSG,
      newPodcast
    );
  } catch (err) {
    console.log(err);
    return common.Response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ReasonPhrases.INTERNAL_SERVER_ERROR,
      appConstants.RESPONSE_SERVER_ERROR_MSG,
      null
    );
  }
};

//fetch channel ID from client and add it to corresponding podcast
const addChannelID: RequestHandler = async (req, res) => {
  try {
    const data = req.body;
    const { podcast_name, channel_id } = data;
    if (!podcast_name || !channel_id) {
      return common.Response(
        res,
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST,
        appConstants.RESPONSE_REQUIRED_FIELD_ERROR_MSG,
        null
      );
    }
    let podWithName = await Podcast.findAll({
      where: { podcast_name: podcast_name },
    });
    //if podcast with given name not found
    if (podWithName.length == 0) {
      return common.Response(
        res,
        StatusCodes.FORBIDDEN,
        ReasonPhrases.FORBIDDEN,
        appConstants.RESPONSE_POD_ERROR_MSG,
        null
      );
    } else {
      //add the channel ID to podcast
      await Podcast.update(
        { channel_id: channel_id },
        { where: { podcast_name: podcast_name } }
      );
    }
    //to get updated podcast with new channel ID
    podWithName = await Podcast.findAll({
      where: { podcast_name: podcast_name },
    });
    return common.Response(
      res,
      StatusCodes.CREATED,
      ReasonPhrases.CREATED,
      appConstants.RESPONSE_CHANNEL_SUCCESS_MSG,
      podWithName
    );
  } catch (err) {
    console.log(err);
    return common.Response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ReasonPhrases.INTERNAL_SERVER_ERROR,
      appConstants.RESPONSE_SERVER_ERROR_MSG,
      null
    );
  }
};

//get channel ID of a particular podcast
const getChannelID: RequestHandler = async (req, res) => {
  try {
    const podcast_name = req.query.podcast_name;
    if (!podcast_name) {
      return common.Response(
        res,
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST,
        appConstants.RESPONSE_REQUIRED_FIELD_ERROR_MSG,
        null
      );
    }
    const channel_id = await Podcast.findAll({
      where: { podcast_name: podcast_name },
    });
    //podcast with given name not found
    if (channel_id.length == 0) {
      return common.Response(
        res,
        StatusCodes.NOT_FOUND,
        ReasonPhrases.NOT_FOUND,
        appConstants.RESPONSE_POD_ERROR_MSG,
        null
      );
    }

    return common.Response(
      res,
      StatusCodes.CREATED,
      ReasonPhrases.CREATED,
      appConstants.RESPONSE_CHANNEL_SUCCESS_MSG,
      channel_id
    );
  } catch (err) {
    console.log(err);
    return common.Response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ReasonPhrases.INTERNAL_SERVER_ERROR,
      appConstants.RESPONSE_SERVER_ERROR_MSG,
      null
    );
  }
};

//gets list of podcasts
const getAllPodcasts: RequestHandler = async (req, res) => {
  try {
    const podList = await Podcast.findAll();
    return common.Response(
      res,
      StatusCodes.OK,
      ReasonPhrases.OK,
      appConstants.DATA_FETCHED,
      podList
    );
  } catch (err) {
    console.log(err);
    return common.Response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ReasonPhrases.INTERNAL_SERVER_ERROR,
      appConstants.RESPONSE_SERVER_ERROR_MSG,
      null
    );  }
};

module.exports = { addNewPodcast, getChannelID, addChannelID, getAllPodcasts };
