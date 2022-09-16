from pickle import NONE, TRUE

class planRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'plan':
            return 'place'
        return None
    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'plan':
            return TRUE
        return None
    def allow_relation(self, obj1, obj2, **hints):
        if obj1._meta.app_label == 'plan' and obj2._meta.app_label == 'plan':
            return 'place'
        return None
    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label =='plan':
            return db == 'place'
        return None