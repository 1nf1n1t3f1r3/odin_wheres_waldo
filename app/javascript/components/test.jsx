const handleImageClick = () => {
  // Get Width/Height, convert to Percentages
  const imageWidth = imageRef.current.clientWidth;
  const imageHeight = imageRef.current.clientHeight;
  const percentX = (mouseCoords.x / imageWidth) * 100;
  const percentY = (mouseCoords.y / imageHeight) * 100;

  // 🔍 Find if the click hit any remaining targets using the Pythagorean theorem
  const foundCharacter = characters.find((char) => {
    if (char.isFound) return false;

    const radiusPercent = (TARGET_RADIUS / imageWidth) * 100;
    const distX = percentX - char.targetX;
    const distY = percentY - char.targetY;
    const totalDistance = Math.sqrt(distX * distX + distY * distY);

    return totalDistance <= radiusPercent;
  });

  // 🎯 Process the matching hit
  if (foundCharacter) {
    const secondsElapsed = (new Date() - startTimeRef.current) / 1000;

    const updatedChars = markCharacterAsFound(
      foundCharacter.id,
      secondsElapsed,
    );
    const isGameOver = checkAndProcessGameOver(updatedChars);

    triggerNotification(
      isGameOver
        ? `Found ${foundCharacter.name}! You found them all!`
        : `Found ${foundCharacter.name}!`,
    );

    console.log(`🎉 Found ${foundCharacter.name} at backend equivalents!`);
  } else {
    console.log(
      `Missed at X: ${percentX.toFixed(1)}%, Y: ${percentY.toFixed(1)}%`,
    );
  }
};

const markCharacterAsFound = (characterId, secondsElapsed) => {
  const updated = characters.map((char) => {
    if (char.id === characterId) {
      return { ...char, isFound: true, timeFound: secondsElapsed.toFixed(1) };
    }
    return char;
  });
  setCharacters(updated);
  return updated; // Returned immediately so game-over logic can read the fresh values
};

const checkAndProcessGameOver = (updatedCharacters) => {
  const isGameOver = updatedCharacters.every((char) => char.isFound);
  if (isGameOver) {
    const completionTimes = updatedCharacters.map((char) =>
      parseFloat(char.timeFound),
    );
    const finalScore = Math.max(...completionTimes);
    setGameResult({ isOver: true, finalScore: finalScore });
  }
  return isGameOver;
};

const triggerNotification = (text) => {
  clearTimeout(notificationTimerRef.current);
  setNotification({
    x: mouseCoords.x,
    y: mouseCoords.y,
    text: text,
  });
  notificationTimerRef.current = setTimeout(() => {
    setNotification(null);
  }, 10000);
};
