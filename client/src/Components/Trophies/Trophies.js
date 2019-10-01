import React, { Component } from 'react'
import Trophy from '../Trophy/Trophy';

export default class Trophies extends Component {
  state = {
    trophies : [
      {
          id:1,
          points: 100,
          name: 'It is Finished',
          type: 'b_hasFinishedWholeBible',
          description: 'Read the whole Bible.'
      },
      {
          id:2,
          points: 100,
          name: 'Oldie but Goodie',
          type: 'b_hasReadWholeOT',
          description: 'Read the Old Testament.'
      },
      {
          id:3,
          points: 100,
          name: 'New News',
          type: 'b_hasReadWholeNT',
          description: 'Read the New Testament.'
      },
      {
          id:4,
          points: 50,
          name: 'A child no more',
          type: 'b_hasReadWholeBook',
          description: 'Read a whole book. Yes, 3 John counts.'
      },
      {
          id:5,
          points: 100,
          name: 'Law school',
          type: 'b_hasReadPentateuch',
          description: 'Read the Pentateuch. Genesis - Deuteronomy'
      },
      {
          id:6,
          points: 100,
          name: 'History 101',
          type: 'b_hasReadHistoricalBooks',
          description: 'Read the historical books. Joshua - Esther'
      },
      {
          id:7,
          points: 100,
          name: 'Aquire Wisdom',
          type: 'b_hasReadWisdomBooks',
          description: 'Read the Wisdom books. Job - Song of Solomon'
      },
      {
          id:8,
          points: 100,
          name: 'Long Prophets',
          type: 'b_hasReadMajorProphets',
          description: 'Read the Major Prophets. Isaiah - Daniel'
      },
      {
          id:9,
          points: 100,
          name: 'Short Prophets',
          type: 'b_hasReadMinorProphets',
          description: 'Read the Minor Prophets. Hosea - Malachai'
      },
      {
          id:10,
          points: 100,
          name: 'The Good News',
          type: 'b_hasReadGospels',
          description: 'Read the Gospels. Matthew - John'
      },
      {
          id:11,
          points: 100,
          name: 'Snail Mails',
          type: 'b_hasReadEpistles',
          description: 'Read the epistles. Romans - Jude'
      },
      {
          id:12,
          points: 100,
          name: 'Act 1, Scene AD',
          type: 'b_hasReadHistoryoftheEarlyChurch',
          description: 'Read the History of the early church. Acts'
      },
      {
          id:13,
          points: 100,
          name: 'The Last Book',
          type: 'b_hasReadApocalypse',
          description: 'Read Revelation. That\'s Revelation, not "Revelations"'
      }
  ]
  }
  render() {
    const {trophies} = this.state;
    return (
      <div className="trophies">
        <div className="trophies__container">

            {
              trophies &&
              trophies.map((trophy)=> {
                const { name, id, description, points, type } = trophy;
                return  <Trophy key={id} trophyName={name} description={description} points={points} hasAchieved={type==="b_hasReadWholeBook"} />
              })
            }

        </div>
      </div>
    )
  }
}
