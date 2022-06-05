const express = require('express');
const router = express.Router();
const Registro = require('../../../../libs/registros');
const RegistroDao = require('../../../../dao/models/RegistroDao');
const regDao = new CategoryDao();
const reg = new Category(regDao);
reg.init();

router.get('/', async (req, res) => {
    
    try {
      // devolver la ejecución el controlador de esta ruta
      const versionData = await reg.getVersion();
      return res.status(200).json(versionData);
    } catch ( ex ) {
      // manejar el error que pueda tirar el controlador
      console.error('Error Registro', ex);
      return res.status(502).json({'error': 'Error Interno de Server'});
    }
  });

router.get('/all', async (req, res) => {
    try {
      const registros = await reg.getRegistros();
      return res.status(200).json(registros);
    } catch (ex) {
      console.error(ex);
      return res.status(501).json({error:'Error al procesar solicitud.'});
    }
  });

  router.get('/byid/:codigo', async (req, res) => {
    try {
      const {codigo} = req.params;
      if (!(/^\d+$/.test(codigo))){
        return res.status(400).json({
          error: 'Se espera un codigo numérico'
        });
      }
      const registro = await reg.getRegistroById({codigo: parseInt(codigo)});
      return res.status(200).json(registro);
    } catch (ex) {
      console.error(ex);
      return res.status(501).json({ error: 'Error al procesar solicitud.' });
    }
  } );

  router.post('/new', async (req, res) => {
    try {
      const { category = '',
        type = '',
        description = '',
        date = '',
        amount = '',
        estado = '' } = req.body;
      if (/^\s*$/.test(category)) {
        return res.status(400).json({
          error: 'Se espera valor de categoria'
        });
      }
  
      if (/^\s*$/.test(type)) {
        return res.status(400).json({
          error: 'Se espera valor de tipo'
        });
      }
      if (/^\s*$/.test(description)) {
        return res.status(400).json({
          error: 'Se espera valor de descripcion'
        });
      }
      if (/^\s*$/.test(date)) {
        return res.status(400).json({
          error: 'Se espera valor de fecha'
        });
      }
      if (/^\s*$/.test(amount)) {
        return res.status(400).json({
          error: 'Se espera valor de monto'
        });
      }
      if (!(/^(ACT)|(INA)$/.test(estado))) {
        return res.status(400).json({
          error: 'Se espera valor de estado en ACT o INA'
        });
      }
      const newRegistro = await reg.addRegistros({
        category,
        type,
        description,
        date,
        amount,
        estado
      });
      return res.status(200).json(newRegistro);
    } catch (ex) {
      console.error(ex);
      return res.status(502).json({ error: 'Error al procesar solicitud' });
    }
  });

  router.put('/update/:codigo', async (req, res) => {
    try {
      const { codigo } = req.params;
      if (!(/^\d+$/.test(codigo))) {
        return res.status(400).json({ error: 'El codigo debe ser un dígito válido.' });
      }
      const { categoria, estado } = req.body;
      if (/^\s*$/.test(categoria)) {
        return res.status(400).json({
          error: 'Se espera valor de categoría'
        });
      }
      if (!(/^(ACT)|(INA)$/.test(estado))) {
        return res.status(400).json({
          error: 'Se espera valor de estado en ACT o INA'
        });
      }
  
      const updateResult = await reg.updateCategory({ codigo: parseInt(codigo), categoria, estado });
  
      if (!updateResult) {
        return res.status(404).json({ error: 'Categoria no encontrada.' });
      }
      return res.status(200).json({ updatedCategory: updateResult });
  
    } catch (ex) {
      console.error(ex);
      res.status(500).json({ error: 'Error al procesar solicitud.' });
    }
  });

  router.delete('/delete/:codigo', async (req, res) => {
    try {
      const { codigo } = req.params;
      if (!(/^\d+$/.test(codigo))) {
        return res.status(400).json({ error: 'El codigo debe ser un dígito válido.' });
      }
  
      const deletedCategory = await user.deleteCategory({ codigo: parseInt(codigo) });
  
      if (!deletedCategory) {
        return res.status(404).json({ error: 'Categoria no encontrada.' });
      }
      return res.status(200).json({ deletedCategory });
  
    } catch (ex) {
      console.error(ex);
      res.status(500).json({ error: 'Error al procesar solicitud.' });
    }
  });
  module.exports = router;
  