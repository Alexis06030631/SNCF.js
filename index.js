Error.code = require('./src/utils/errors')

exports.Base = require('./src/base')
exports.Utils = require('./src/utils/utils')

exports.StructureManager = require('./src/structures/StructuresManager')
exports.Client = require('./src/managers/ClientManager')
exports.Lines = require('./src/managers/LinesManager')
exports.Disruptions = require('./src/managers/DisruptionsManager')
exports.Places = require('./src/places')