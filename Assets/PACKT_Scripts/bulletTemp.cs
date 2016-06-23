using UnityEngine;
using System.Collections;

public class bulletTemp : MonoBehaviour {
	public int damage = 2;

	void Start () 
	{
		Destroy(gameObject, 2);
	}
	
	void OnCollisionEnter(Collision other)
	{
		if(other.gameObject.tag == "Enemy")
		{
			other.gameObject.SendMessage("AddDamage", damage);
		}
	}
}
