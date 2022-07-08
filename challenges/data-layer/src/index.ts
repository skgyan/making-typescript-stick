export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}

export interface Comic extends DataEntity {
  issueNumber: number;
}

export type DataEntityMap = {
  movie: Movie;
  song: Song;
  comic: Comic;
};

type DataStoreMethods = {
  [K in keyof DataEntityMap as `getAll${Capitalize<K>}s`]: () => DataEntityMap[K][];
} & {
  [K in keyof DataEntityMap as `get${Capitalize<K>}`]: (id: string) => DataEntityMap[K];
} & {
  [K in keyof DataEntityMap as `clear${Capitalize<K>}s`]: () => void;
} & {
  [K in keyof DataEntityMap as `add${Capitalize<K>}`]: (arg: DataEntityMap[K]) => DataEntityMap[K];
} 

function isDefined<T>(x: T | undefined): x is T {
  return typeof x !== 'undefined';
}

export class DataStore implements DataStoreMethods {
  #data: {[K in keyof DataEntityMap]: Record<string, DataEntityMap[K]> } = {
    movie: {},
    song: {},
    comic: {},
  };

  getAllSongs() {
    return Object.keys(this.#data.song).map(
      (songKey) => this.#data.song[songKey]
    ).filter(isDefined)
  }

  getSong(songKey: string): Song {
    const song = this.#data.song[songKey]
    if(!song) throw Error(`no song found for the key ${songKey}`);
    return song;
  }

  clearSongs(): void {
    this.#data.song = {};
  }

  addSong(song: Song): Song {
    this.#data.song[song.id] = song;
    return song;
  }

  getAllMovies() {
    return Object.keys(this.#data.movie).map(
      (movieKey) => this.#data.movie[movieKey]
    ).filter(isDefined)
  }

  getMovie(movieKey: string): Movie {
    const movie = this.#data.movie[movieKey]
    if(!movie) throw Error(`no Movie found for the key ${movieKey}`);
    return movie;
  }

  clearMovies(): void {
    this.#data.movie = {};
  }

  addMovie(m: Movie): Movie {
    this.#data.movie[m.id] = m;
    return m;
  }

  getAllComics() {
    return Object.keys(this.#data.comic).map(
      (comicKey) => this.#data.comic[comicKey]
    ).filter(isDefined)
  }

  getComic(comicKey: string): Comic {
    const comic = this.#data.comic[comicKey]
    if(!comic) throw Error(`no comic found for the key ${comicKey}`);
    return comic;
  }

  clearComics(): void {
    this.#data.comic = {};
  }

  addComic(c: Comic): Comic {
    this.#data.comic[c.id] = c;
    return c;
  }
}

const ds = new DataStore();

ds.clearComics();
ds.addComic({id: '1234', issueNumber: 1234});
ds.getAllComics();