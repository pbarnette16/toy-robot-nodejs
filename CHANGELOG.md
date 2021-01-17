#Change Log V2

##Fixed
- Fixed issue where the app was prescreening the inputs for the robot
- Fixed the issue where testing was failing
- Fixed issue with the regex which parsed the place command to return whatever the input direction was
- Fixed issue with the Move command being executed without the robot being placed on the grid
- Fixed issue where multiple error messages weren't being properly displayed

## Updates
- Created a new messaging structure which allows for Messages to be sent easily and consistently.
The format is as follows:
{
    msgType: ["success","error","normal"], // ect of for the different messaging types
    msg: "Message to be returned to the user"
}

This provided for two benefits 
1) It allowed for the streamlining of how messages where being sent. So 
messages could be consolidated and alerted to the user from a single point.
2) This made testing that much easier. The structure could easily be tested and you
had more control over how the message was broadcast.

All of the robot commands were revamped to use this new structure. 

### Testing revamp
One of the major tasks of this version of the code was to update the testing structure.
Originally the Robot was based on an EventEmitter at the time that seemed like the logical direction,
however, when it came to testing it became very unwieldy because the emitter would only return true.

I explored how to wrap a promise around the emitter and looked at several different ways to do so.
None of the explored options quite did what was needed for consistent testing. The solution was to 
convert the EventEmitter to a Promise structure. As a promise you could be sure to get a returned result or 
could also throw an error and handle it consistently.

With an update as to how the message structure is handled it allowed for easy testing of the commands 
and expected results.