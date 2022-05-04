from .. import db




class FractalType(db.Model):
    name = db.Column(db.String(32), primary_key=True)

    def __repr__(self):
        return "<FractalType: {}>".format(self.name)


class Project(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(64), None)
    type = db.Column(db.String(32), db.ForeignKey('fractal_type.name)'))
    public = db.Column(db.Boolean(), None)
    
    def __repr__(self):
        return "<Project: id={}>".format(self.id)



class Mandelbrot(db.Model):
    
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), primary_key=True)
    
    zoom = db.Column(db.Integer, None)
    iterations = db.Column(db.Integer, None)
    pos_x = db.Column(db.Double, None)
    pos_y = db.Column(db.Double, None)    
    
    def __repr__(self):
        return '<Mandelbrot: id={}>'.format(self.project_id)
    
    
    
    
    
    
    