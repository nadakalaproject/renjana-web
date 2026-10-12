import { type SchemaTypeDefinition } from 'sanity'
import { audio } from './audio'
import { visual } from './visual'
import { merchandise } from './merchandise' 

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [audio, visual, merchandise], 
}