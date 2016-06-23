#pragma strict
var life : float = 1.5;

function SentTarget(pickTrans : Transform)
{
	transform.LookAt(pickTrans);
	yield WaitForSeconds(life);
	ReturnTarget();
}

function ReturnTarget()
{
	Destroy(transform.parent.gameObject);
}