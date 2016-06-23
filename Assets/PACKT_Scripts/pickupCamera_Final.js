#pragma strict
//var camTarget : Transform;
var life : float = 1.5;
var pickTarget : Transform;//only need for debug
var origTarget : Transform; 
var damping : float = 5.0;
//not used
var camOffset : Vector3;//camera will need to move to this position
//var headBone : Transform;
//var controllerScript : FirstPersonController;

var pickTargetActive : boolean = false; //debug, delete after

function Awake()
{
	//transform.LookAt(camTarget);
	//yield WaitForSeconds(life);
	//destroy(gameObject);
}

function SentTarget(pickTrans : Transform)
{
	pickTarget = pickTrans; //debugging
	pickTargetActive = true;//debugging
	//transform.LookAt(pickTarget);
	//controllerScript.controllable = false;
	//yield WaitForSeconds(life);
	
	yield WaitForSeconds(0.1); //tiny delay
	//moveCamera
	var fixedPos : Vector3 = transform.position + camOffset;
	transform.position = fixedPos;
	//I will need to lerp this
	
	//maybe I want to parent the camera to the rig's headbone so that it animates with the arms 
	//and we cannot see the ends
	
	var lookAtPosition : Vector3 = pickTarget.position;
    lookAtPosition.y = transform.position.y;
    lookAtPosition.z = transform.position.z;
    var rotation = Quaternion.LookRotation(lookAtPosition - transform.position);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * damping);	
	yield WaitForSeconds(life);
	ReturnTarget();
}

	function ReturnTarget()	
{
	pickTargetActive = false;
	//controllerScript.controllable = true;
	var origPosition : Vector3 = origTarget.position;
    origPosition.y = transform.position.y;
    origPosition.z = transform.position.z;
    var rotation = Quaternion.LookRotation(origPosition - transform.position);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * damping);
	
	//yield WaitForSeconds(life);//necessary?
	Destroy(transform.parent.gameObject);
}