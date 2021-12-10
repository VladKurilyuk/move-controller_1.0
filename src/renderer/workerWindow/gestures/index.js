
/* global fp window console */
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

window.NetModel = { 
    gestures: [thumbsDownDescription] 
};