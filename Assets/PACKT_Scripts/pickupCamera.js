#pragma strict
//the camera will initialize with its original rotation

var camTarget : Transform;
var pickingUp : boolean;
var defaultTarget : Transform;
//var defaultRotation : Vector3;
var damping : float = 10.0;

function Update () 
{
	//camtarget stays here! We should switch the camera with a function instead
	if(camTarget)
	{
		pickingUp = true;
		//rotate to look at the target
	}
	else
	{
		transform.LookAt(defaultTarget);
		pickingUp = false;
		camTarget = null;
	}
	
	if(pickingUp)
	{
		PickUp();
		//we want to lerp into this Rotation
		/*var lookAtPosition : Vector3 = camTarget.position;
    	lookAtPosition.y = transform.position.y;
    	lookAtPosition.z = transform.position.z;
    	//transform.LookAt(lookAtPosition);
    	
    	var rotation = Quaternion.LookRotation(lookAtPosition - transform.position);
		transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * damping);
		//transform.LookAt(camTarget);
	}
	else
	{
	//lerp back into defaultRotation*/
	}
}
function PickUp()
{
	var lookAtPosition : Vector3 = camTarget.position;
    lookAtPosition.y = transform.position.y;
    lookAtPosition.z = transform.position.z;
    //transform.LookAt(lookAtPosition);
    	
    var rotation = Quaternion.LookRotation(lookAtPosition - transform.position);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * damping);	
	ReturnTarget();
}

function ReturnTarget()
{
	pickingUp = false;
}