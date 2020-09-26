import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class NotesService {
  async getAll(userEmail) {
    return await dbContext.Notes.find({ creatorEmail: userEmail }).populate(
      "creator",
      "name picture"
    );
  }

  async getById(id, userEmail) {
    let data = await dbContext.Notes.findOne({
      _id: id,
      creatorEmail: userEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this note");
    }
    return data;
  }
  // async find(query = {}) {
  //
  //   let comment = await dbContext.Notes.find(query);
  //   return comment;
  // }
  async create(rawData) {
    let data = await dbContext.Notes.create(rawData);
    return data;
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Notes.findOneAndUpdate(
      { _id: id, creatorEmail: userEmail },
      update,
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this note");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Notes.findOneAndRemove({
      _id: id,
      creatorEmail: userEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this note");
    }
  }
}

export const notesService = new NotesService();
