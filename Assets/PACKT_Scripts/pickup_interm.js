#pragma strict
var life : float = 1.5;
var origTarget : Transform;
var pickTarget : Transform;
var damping : float = 5.0;

function SentTarget(pickTrans : Transform)
{
	pickTarget = pickTrans;

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
	var origPosition : Vector3 = origTarget.position;
    origPosition.y = transform.position.y;
    origPosition.z = transform.position.z;
    var rotation = Quaternion.LookRotation(origPosition - transform.position);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * damping);

	//Debug.Log("camera dead");
	Destroy(transform.parent.gameObject);
}