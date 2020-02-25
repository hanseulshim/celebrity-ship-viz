import { Model } from 'objection'

export class Filter extends Model {
  static get tableName() {
    return 'filter'
  }
}

export class Channel extends Model {
  static get tableName() {
    return 'channel'
  }
}

export class PointOfSaleMarket extends Model {
  static get tableName() {
    return 'marketPos'
  }
}

export class CabinCategoryClass extends Model {
  static get tableName() {
    return 'cabinCategoryClass'
  }
}

export class CabinCategory extends Model {
  static get tableName() {
    return 'cabinCategory'
  }
}

export class CabinClassRate extends Model {
  static get tableName() {
    return 'cabinClassRate'
  }
}

export class RateCategory extends Model {
  static get tableName() {
    return 'rateCategory'
  }
}
