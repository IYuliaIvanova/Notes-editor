import { ICountTag, INotes, IObject, ITag, ITagNotes } from "../interfaces/interfaces";

export const splitTags = (value: string): string[] => {
  const tags: string[] = [];

  value.split(' ').forEach((word) => {
    if(word.includes('#') && word.length > 1) {
      tags.push(word)
    }
  })

  return tags.map((item, id) => {
    return item.split('#').slice(1)
  }).flat();
}

export const addNewTags = (tags: ITag[], tagsInput: string[]): ITag[] => {
  const newTags: ITag[] = []
  let filterTags = new Set(tagsInput)

  if(tags.length !== 0){
    tags.forEach((item) => {
      if(filterTags.has(item.text)){
        filterTags.delete(item.text)
      }
    })

    Array.from(filterTags).forEach((value, id) => {
      newTags.push({ id: (new Date()).getTime() + id, text: value })
    })
  } else {
    tagsInput.forEach((value, id) => {
      newTags.push({ id: (new Date()).getTime() + id, text: value })
    })
  }

  return newTags
}

export const getTagNotes = (tags: ITag[], tagsInput: string[]): ITagNotes[] => {
  const newTagsNotes: ITagNotes[] = []

  tags.forEach((item) => {
    for (let i = 0; i < tagsInput.length; i++) {
      if( item.text === tagsInput[i]){
        newTagsNotes.push({
            id: (new Date()).getTime() + i, 
            tag: {
              id: item.id,
              text: tagsInput[i]
            }
        })
      }
    }
  })

  return newTagsNotes
}

export const countAllTagsNotes = (notes: INotes[], tags: ITag[]): ICountTag[] => {
  let allTagsNotes: string[][] = []
  let countTags: ICountTag[] = [];

  notes.forEach((item) => {
    allTagsNotes.push(splitTags(item.text))
  });

  let result = allTagsNotes.flat().reduce((acc: IObject, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  },{})

  for (const key in result) {
    tags.forEach((item) => {
      if(key === item.text){
        countTags.push({id: item.id, tag: item.text, count: result[key]})
      }
    })
  }

  return countTags
}

export const diff = (a: string[], b: string[]) => {
  const diff = a.filter(val => b.indexOf(val) === -1)
  
  return diff.concat(b.filter((val)=> a.indexOf(val) === -1))
}