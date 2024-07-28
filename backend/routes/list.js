const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

//create
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, tags,id } = req.body;
    const existingUser = await User.findById(id);
    if (existingUser) {
      const list = new List({ title: title, body: body,tags: tags, user: existingUser });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    console.log(error);
  }
});

//update
router.put("/updateTask/:id", async (req, res) => {
  try {
    const{title,body,tags} =req.body;
    const list = await List.findByIdAndUpdate(req.params.id, { title, body,tags });
    list.save().then(() => res.status(200).json({ message: "Task Updated" }));
  } catch (error) {
    console.log(error);
  }
});

//delete
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(
      id,
      { $pull: { list: req.params.id } }
    );
    if (existingUser) {
      const list = await List.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({
          message: "Task Deleted",
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
});

//getTask
router.get("/getTasks/:id", async (req, res) => {
  const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
  if (list.length != 0) {
    res.status(200).json({ list: list });
  } else {
    res.status(200).json({ message: "No task added yet" });
  }
});



//getTaskByTag
router.get("/getTasksByTag/:tag", async (req, res) => {
  try {
    const { tag } = req.params;
    const { userId } = req.query; // Assuming userId is passed as a query parameter
    const list = await List.find({ user: userId, tags: tag }).sort({ createdAt: -1 });
    if (list.length != 0) {
      res.status(200).json({ list });
    } else {
      res.status(200).json({ message: "No tasks found for this tag" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred while retrieving tasks by tag" });
  }
});





//getTaskByTag
// router.get("/getTasksByTag/:tag", async (req, res) => {
//   const list = await List.find({ user: req.params.id });
//   res.status(200).json({ list: list });
// });

// Search Tasks
router.get("/searchTasks", async (req, res) => {
  const { query, userId } = req.query;

  try {
    const tasks = await List.find({
      user: userId,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { body: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    if (tasks.length > 0) {
      res.status(200).json({ tasks });
    } else {
      res.status(200).json({ message: "No matching tasks found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred while searching for tasks" });
  }
});

module.exports = router;
