const express = require("express");

const User = require("../models/User");

const Cadastro = () => {};

Cadastro.findAll = async (req, res) => {
  try {
    usuarios = await User.find({});
    res.send({ usuarios });
  } catch (error) {
    res.send({ error });
  }
};

Cadastro.find = async (req, res) => {
  const { email } = req.params;

  try {
   const usuario = await User.find({ email: email });
    if (usuario.length > 0) {
      res.send({ usuario });
    }else {
      res.send({message: 'usuario não encontrado'})
    }

  } catch (error) {
    res.status(400).send({ error: "erro ao buscar usuario!" });
  }
};

Cadastro.create = async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "User already exists!" });
    }
    const user = await User.create(req.body);

    user.password = undefined;

    return res.send({ user });
  } catch (error) {
    return res.status(400).send({ error: "Registration failed!" });
  }
};

Cadastro.update = async (req, res) =>{
  const { email } = req.params;
  try {
    const usuario = await User.findOneAndUpdate({ email: email }, req.body)
    if (usuario) {
      let atualizado = await User.findOne({ email })
      res.send({ atualizado });
    }else {
      res.send({message: 'usuario não encontrado'})
    }
  } catch (error) {
    res.status(400).send({ error: "erro ao atualizar usuario!" });
  }
}

Cadastro.delete = async (req, res)=> {
  const { email } = req.params;
  try {
    const usuario = await User.remove({email: email})
    res.send({message: 'Usuario deletado! '+email})
  } catch (error) {
    res.status(400).send({ error: "erro ao deletar usuario!" });
  }
}

module.exports = Cadastro;
