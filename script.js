const tBody = document.querySelector("tbody")

const renderEntry = entry => {
  const entryStr = `
  <td>${entry.entryType}</td>
  <td class="name">${entry.name}</td>
  <td class="right">${(entry.transferSize / 1000).toFixed(2)} kB</td>
  <td class="right">${(entry.responseEnd - entry.responseStart).toFixed(1)} ms</td>
  `
  tBody.insertAdjacentHTML('beforeend', entryStr)

}

const listEntries = () => {
  window.performance.getEntries().forEach(renderEntry)
}

listEntries()

const networkSpeedDetect = () => {
  let totalSize = 0
  let totalTime = 0
  const validEntries = []
  window.performance.getEntries().forEach(entry => {
    // only check entries where there's transferSize and valid responseStart/End times
    // we expect to see initial navigation entry and one/more resource entries
    if (entry.transferSize && entry.responseStart && entry.responseEnd) {
      // only check entries where there's actually a transfer time to calculate on
      if (entry.responseEnd > entry.responseStart) {
        validEntries.push(entry)
        const timeTaken = entry.responseEnd - entry.responseStart
        totalTime += timeTaken
        totalSize += entry.transferSize
      }
    }
  })

  const kbitsPerSecond = Math.round(totalSize / totalTime * 8)
  document.querySelector("#speed").innerHTML = kbitsPerSecond
}

networkSpeedDetect()