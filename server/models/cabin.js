import { Model } from 'objection'

export class Cabin extends Model {
  static get tableName() {
    return 'cabin'
  }

  static get relationMappings() {
    return {
      bookingSnapshotWeeks: {
        relation: Model.HasManyRelation,
        modelClass: BookingSnapshotWeeks,
        join: {
          from: 'cabin.id',
          to: 'bookingSnapshotWeeks.cabinId'
        }
      }
    }
  }
}

export class BookingSnapshotWeeks extends Model {
  static get tableName() {
    return 'bookingSnapshotWeeks'
  }
}
