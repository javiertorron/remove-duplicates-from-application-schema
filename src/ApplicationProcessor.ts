import { ApplicationModel } from './models';

export class ApplicationProcessor {
  removeDuplicates(array: any[]): any[] {
    return array.filter((v, i, a) => a.findIndex(t => t.key === v.key) === i);
  }

  sanitize(application: ApplicationModel): ApplicationModel {
    if (!Array.isArray(application.versions)) {
      throw new Error("Invalid schema: 'versions' must be an array");
    }

    application.versions = application.versions.map(version => {
      if (!version.objects || !version.scenes) {
        throw new Error(
          'Invalid schema: missing objects or scenes in a version',
        );
      }

      version.objects = version.objects.map(object => {
        if (object.fields) {
          object.fields = this.removeDuplicates(object.fields);
        }
        return object;
      });

      version.scenes = version.scenes.map(scene => {
        if (scene.views) {
          scene.views = this.removeDuplicates(scene.views);
        }
        return scene;
      });

      return version;
    });

    return application;
  }
}
