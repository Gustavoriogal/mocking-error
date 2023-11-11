const passport = require('passport');
const User = require('./dao/models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            console.log('Email:', email);
            console.log('Password:', password);

            try {
                const user = await User.findOne({ email });

                if (!user) {
                    console.log('Usuario no encontrado');
                    return done(null, false, { message: 'Usuario no encontrado' });
                }

                const isPasswordValid = await user.validatePassword(password);

                if (!isPasswordValid) {
                    console.log('Contraseña incorrecta');
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }

                console.log('Inicio de sesión exitoso');
                return done(null, user);
            } catch (err) {
                console.error('Error en la estrategia:', err);
                return done(err);
            }
        }
    )
);


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
