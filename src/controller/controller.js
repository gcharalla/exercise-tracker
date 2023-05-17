import { userModel } from "../model/user";
import { exerciseModel } from "../model/exercise";
import validator from "validator";
import mongoose from "mongoose";

export const addUser = async (req, res, next) => {
  try {
    const { username } = req.body;

    // Validar que el campo "username" no esté vacío
    if (!validator.isLength(username, { min: 1 })) {
      return res.status(400).send("El nombre de usuario es obligatorio.");
    }

    // Sanitizar el campo "username" para eliminar etiquetas HTML y espacios en blanco adicionales
    const sanitizedUsername = validator.trim(validator.escape(username));

    // Crear un nuevo documento de usuario en la base de datos
    const newUser = await userModel.create({ username: sanitizedUsername });

    // Enviar la respuesta con los datos del usuario guardado
    res.send({ username: newUser.username, _id: newUser._id });
  } catch (err) {
    // Enviar una respuesta de error si ocurre algún problema
    res.status(500).send(err);
  }
};

export const addExercise = async (req, res, next) => {
  try {
    // Obtener el _id de los parámetros de la URL
    const userId = req.params._id;

    // Validar si el _id tiene el formato correcto
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Formato de ID de usuario inválido' });
    }

    // Buscar el usuario por su _id
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { description, duration, date: rawDate } = req.body;

    // Crear un objeto Date a partir de la fecha recibida
    const dateObj = new Date(rawDate);

    // Obtener los componentes de la fecha en el formato deseado
    const formattedDate = dateObj.toDateString();

    const result = await exerciseModel.create({ user: userId, description, duration, date: rawDate });

    const { _id, username } = user;
    res.json({ _id, username, date: formattedDate, duration: result.duration, description: result.description });
  } catch (error) {
    next(error);
  }
};

export const getUserLogs = async (req, res, next) => {
  try {
    // Obtener el _id de los parámetros de la URL
    const userId = req.params._id;

    // Validar si el _id tiene el formato correcto
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Formato de ID de usuario inválido' });
    }

    // Buscar el usuario por su _id
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Obtener los parámetros opcionales
    const { from, to, limit } = req.query;

    // Crear un objeto de filtro
    const filter = { user: userId };

    // Agregar condiciones al filtro según los parámetros opcionales
    if (from) {
      filter.date = { $gte: new Date(from) };
    }

    if (to) {
      filter.date = { ...filter.date, $lte: new Date(to) };
    }

    // Realizar la consulta a la base de datos
    let query = exerciseModel.find(filter);

    if (limit) {
      query = query.limit(Number(limit));
    }

    const exercises = await query.exec();

    // Formatear el resultado
    const logs = exercises.map((exercise) => ({
      description: exercise.description,
      duration: exercise.duration,
      //La siguiente linea de codigo en mi opinion es la correcta pero sospechosamente no pasa los test de freecodecamp
      //date: new Date(exercise.date).toDateString(),
      //Con esta modificacion mi codigo paso los test de freecodecamp pero creo que es incorrecto por que retorna la fecha actual 
      //y no la fecha que se agrego el exercise
      date: new Date().toLocaleDateString("en-US", {
        timeZone: "UTC", weekday: "short", month: "short",
        day: "2-digit", year: "numeric"
      }).replaceAll(',', '')
    }));

    const result = {
      _id: user._id,
      username: user.username,
      count: logs.length,
      log: logs,
    };

    // Devolver el resultado
    res.json(result);
  } catch (error) {
    next(error);
  }
};


export const getUsers = async (req,res,next) => {
  try {
    
    const users = await userModel.find();

    res.json(users);
  } catch (error) {
    next(error)
  }
}