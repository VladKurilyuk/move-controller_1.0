
/* global fp window */
//* @gesture: Thumbs Down
// *
const thumbsDownDescription = new fp.GestureDescription('thumbs_down');

thumbsDownDescription.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
thumbsDownDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalDown, 1.0);
thumbsDownDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownLeft, 0.9);
thumbsDownDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownRight, 0.9);

for (let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    thumbsDownDescription.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    thumbsDownDescription.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}

thumbsDownDescription.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownLeft, 1.0);
thumbsDownDescription.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalLeft, 1.0);
thumbsDownDescription.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1.0);
thumbsDownDescription.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownRight, 1.0);

//* @gesture: Punch
// *
const punchDescription = new fp.GestureDescription('punch');

punchDescription.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl);

for (let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]){
    punchDescription.addCurl(finger, fp.FingerCurl.FullCurl);
}

//* @gesture: Rock
// *
const rockDescription = new fp.GestureDescription('rock');

rockDescription.addCurl(fp.Finger.Index ,fp.FingerCurl.NoCurl);
rockDescription.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl);
rockDescription.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl);

rockDescription.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
rockDescription.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 0.9);
rockDescription.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 0.9);

rockDescription.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 1.0);
rockDescription.addDirection(fp.Finger.Pinky, fp.FingerDirection.DiagonalUpLeft, 0.9);
rockDescription.addDirection(fp.Finger.Pinky, fp.FingerDirection.DiagonalUpRight, 0.9);

for (let finger of [fp.Finger.Middle, fp.Finger.Ring]) {
    rockDescription.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    rockDescription.addCurl(finger, fp.FingerCurl.HalfCurl, 0.8);

    rockDescription.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
    rockDescription.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 0.9);
    rockDescription.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.9);
}

//* @gesture: Five
// *
const fiveDescription = new fp.GestureDescription('five');

for (let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    fiveDescription.addCurl(finger, fp.FingerCurl.NoCurl);

    fiveDescription.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
    fiveDescription.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 0.9);
    fiveDescription.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.9);
}

//* @gesture: Walk
// *
const indexSideDescription = new fp.GestureDescription('walk');

indexSideDescription.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
indexSideDescription.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 0.8);
indexSideDescription.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);

indexSideDescription.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalLeft, 1.0);
indexSideDescription.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 0.9);
indexSideDescription.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownLeft, 0.9);

indexSideDescription.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1.0);
indexSideDescription.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 0.9);
indexSideDescription.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownRight, 0.9);

indexSideDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
indexSideDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 0.9);
indexSideDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 0.9);


for (let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    indexSideDescription.addCurl(finger, fp.FingerCurl.FullCurl);
}

//* @gesture: Index to top
// *
const indexTopDescription = new fp.GestureDescription('index_top');

indexTopDescription.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
indexTopDescription.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 0.8);
indexTopDescription.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl);

indexTopDescription.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
indexTopDescription.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 0.9);
indexTopDescription.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 0.9);

for (let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    indexTopDescription.addCurl(finger, fp.FingerCurl.FullCurl);
}

window.NetModel = { 
    gestures: 
        [
            thumbsDownDescription, 
            punchDescription, 
            rockDescription, 
            fiveDescription,
            indexSideDescription,
            indexTopDescription,
        ], 
};