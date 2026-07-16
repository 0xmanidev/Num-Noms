export default class Score{
    constructor(results){
        this.results = results;
    }
    getResults(){
        if(typeof this.results ==="function"){
            return this.results();
        }
        return this.results;
    }
    totalLevelsPlayed(){
        return this.getResults().length;
    }
    compositeFrom(firstLevel,lastLevel){
        const totalLevelsPlayed = this.totalLevelsPlayed();
        if(firstLevel<1|| lastLevel<1){
            throw new Error("Level must ne greater than 0.");
 }

    if (firstLevel > lastLevel) {
      throw new Error("First level cannot be greater than last level.");
    }

    if (lastLevel > totalLevelsPlayed) {
      throw new Error("Last level is greater than total levels played.");
    }

    let composite = 0;

    for (let i = firstLevel - 1; i < lastLevel; i++) {
      composite += this.getResults()[i].endNumber;
    }

    return composite;
  }

  compositeThrough(levelsPlayed) {
    return this.compositeFrom(1, levelsPlayed);
  }

  averageFrom(firstLevel, lastLevel) {
    const totalLevels = lastLevel - firstLevel + 1;

    return (
      this.compositeFrom(firstLevel, lastLevel) /
      totalLevels
    );
  }

  averageThrough(levelsPlayed) {
    return this.averageFrom(1, levelsPlayed);
  }

  composite() {
    return this.compositeThrough(
      this.totalLevelsPlayed()
    );
  }

  average() {
    return this.averageThrough(
      this.totalLevelsPlayed()
    );
  }
}