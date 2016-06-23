#pragma strict
var damage : int = 2;

function Start()
{
	Destroy(gameObject, 2);
}

function OnCollisionEnter(other : Collision)
{
	if(other.gameObject.tag == "Enemy")
	{
		other.gameObject.SendMessage("AddDamage", damage);
	}
}