from pickle import NONE


class placeRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'place':
            return 'place'
        return None
    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'place':
            return 'place'
        return None
    def allow_relation(self, obj1, obj2, **hints):
        if obj1._meta.app_label == 'place' and obj2._meta.app_label == 'place':
            return True
        return None
    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label =='place':
            return db =="place"
        return None