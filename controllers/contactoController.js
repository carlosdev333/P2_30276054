import ContactoModel from '../models/contactoModel.js';

const model = new ContactoModel();

class ContactoController {
    static add(req, res) {
        const { email, nombre, comentario } = req.body;
        const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const fecha_hora = new Date().toISOString();

        if (!email || !nombre || !comentario) {
            return res.status(400).send("Datos incompletos");
        }
        console.log(`Fecha: ${fecha_hora} IP: ${ip} Email: ${email} Nombre: ${nombre} Comentario: ${comentario}`);

        const contacto = { email, nombre, comentario, ip, fecha_hora };
        model.save(contacto, (err) => {
            if (err) {
                return res.status(500).send("Error al guardar los datos");
            }
            res.redirect('/success');
        });
    }

    static showForm(req, res) {
        res.render('formulario');
    }

    static showSuccess(req, res) {
        res.render('success');
    }
}

export default ContactoController;
